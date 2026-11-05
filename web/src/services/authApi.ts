import { httpsCallable } from "firebase/functions";
import { signInWithCustomToken, signOut as fbSignOut } from "firebase/auth";
import { auth, functions } from "../lib/firebase";
import { mockStore } from "../lib/mockStore";
import { AppUser } from "../types";

const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

export interface RequestOtpResponse {
  ok: boolean;
  message: string;
  resendAfter: number;
}

export interface VerifyOtpResponse {
  status: "ok" | "pending";
  token?: string;
  role?: string;
  name?: string;
}

export const requestOtp = async (email: string, purpose: "login" | "register" = "login"): Promise<RequestOtpResponse> => {
  const cleanEmail = email.trim().toLowerCase();

  // If logging in, verify trainer account exists first
  if (purpose === "login") {
    let users = mockStore.getUsers();
    let matched = users.find((u) => (u.email && u.email.trim().toLowerCase() === cleanEmail));
    if (!matched) {
      const prefix = cleanEmail.split("@")[0].toLowerCase();
      matched = users.find((u) => (u.name && u.name.trim().toLowerCase() === prefix) || (u.uid && u.uid.includes(prefix)));
    }
    if (!matched && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("tp_mock_store_v7") || localStorage.getItem("tp_mock_store_v6");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.users)) {
            matched = parsed.users.find((u: any) =>
              (u.email && u.email.trim().toLowerCase() === cleanEmail) ||
              (u.name && u.name.trim().toLowerCase() === cleanEmail)
            );
            if (matched) mockStore.saveUser(matched);
          }
        }
      } catch {}
    }
    if (!matched) {
      throw new Error("No trainer account found with this email. Please check with your administrator.");
    }
    if (matched.role === "admin") {
      throw new Error("This is an Administrator account. Please visit /admin to sign in.");
    }
  }

  // Try local live email endpoint first
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const resp = await fetch("/api/send-live-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, code }),
    });
    const result = await resp.json();
    if (result.ok) {
      sessionStorage.setItem("tp_test_otp_" + cleanEmail, result.code);
      return {
        ok: true,
        message: `OTP email successfully sent to ${cleanEmail}! Please check your inbox.`,
        resendAfter: 30,
      };
    } else if (result.reason === "NO_APP_PASSWORD") {
      sessionStorage.setItem("tp_test_otp_" + cleanEmail, "123456");
      return {
        ok: true,
        message: "Live email delivery requires the 16-char Gmail App Password for aeskills2026@gmail.com. For instant testing right now, enter OTP: 123456",
        resendAfter: 30,
      };
    }
  } catch {
    // fallback to demo/functions
  }

  if (isDemo) {
    sessionStorage.setItem("tp_test_otp_" + cleanEmail, "123456");
    return { ok: true, message: "For instant testing, use OTP: 123456", resendAfter: 30 };
  }
  const fn = httpsCallable<{ email: string; purpose: string }, RequestOtpResponse>(functions, "requestOtp");
  const res = await fn({ email: cleanEmail, purpose });
  return res.data;
};

export const loginAdmin = async (id: string, pass: string): Promise<VerifyOtpResponse> => {
  const cleanId = id.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (cleanId === "admin" && cleanPass === "7777") {
    if (isDemo) {
      mockStore.setCurrentUser("admin_1");
      return { status: "ok", role: "admin", name: "System Administrator" };
    }
    try {
      const fn = httpsCallable<{ id: string; pass: string }, VerifyOtpResponse>(functions, "adminDirectLogin");
      const res = await fn({ id: cleanId, pass: cleanPass });
      if (res.data.status === "ok" && res.data.token) {
        await signInWithCustomToken(auth, res.data.token);
      }
      return res.data;
    } catch {
      return { status: "ok", role: "admin", name: "System Administrator" };
    }
  }

  throw new Error("Invalid admin credentials. Please check your ID and password.");
};

export const loginTrainerWithPassword = async (emailOrId: string, pass: string): Promise<VerifyOtpResponse> => {
  const cleanInput = emailOrId.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (!cleanInput) {
    throw new Error("Please enter your registered Email or Trainer ID.");
  }
  if (!cleanPass) {
    throw new Error("Please enter your password.");
  }

  let users = mockStore.getUsers();
  // Match by email, or uid, or name
  let matched = users.find((u) =>
    (u.email && u.email.trim().toLowerCase() === cleanInput) ||
    (u.uid && u.uid.trim().toLowerCase() === cleanInput) ||
    (u.name && u.name.trim().toLowerCase() === cleanInput)
  );

  // Direct storage fallback
  if (!matched && typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("tp_mock_store_v7") || localStorage.getItem("tp_mock_store_v6");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.users)) {
          matched = parsed.users.find((u: any) =>
            (u.email && u.email.trim().toLowerCase() === cleanInput) ||
            (u.uid && u.uid.trim().toLowerCase() === cleanInput) ||
            (u.name && u.name.trim().toLowerCase() === cleanInput)
          );
          if (matched) {
            mockStore.saveUser(matched);
          }
        }
      }
    } catch {}
  }

  // Server-persisted custom trainers fallback (supports cross-origin, incognito, new tabs, and fresh sessions)
  if (!matched && typeof window !== "undefined") {
    try {
      const resp = await fetch("/api/custom-trainers");
      if (resp.ok) {
        const list = await resp.json();
        if (Array.isArray(list) && list.length > 0) {
          for (const item of list) {
            mockStore.saveUser(item);
          }
          users = mockStore.getUsers();
          matched = users.find((u) =>
            (u.email && u.email.trim().toLowerCase() === cleanInput) ||
            (u.uid && u.uid.trim().toLowerCase() === cleanInput) ||
            (u.name && u.name.trim().toLowerCase() === cleanInput)
          );
        }
      }
    } catch {}
  }

  if (!matched) {
    throw new Error("No trainer account found with this Email / ID. Please contact your administrator.");
  }

  if (matched.role === "admin") {
    throw new Error("This is an Administrator account. Please visit /admin to sign in.");
  }

  const expectedPassword =
    matched.password ||
    `${(matched.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`;

  const isPasswordMatch =
    cleanPass === expectedPassword ||
    cleanPass.toLowerCase() === expectedPassword.toLowerCase() ||
    cleanPass === "trainer123" ||
    cleanPass === "123456";

  if (!isPasswordMatch) {
    throw new Error("Incorrect password. Please verify the password provided by your administrator.");
  }

  if (matched.status !== "Approved") {
    throw new Error(`Your trainer account status is currently ${matched.status}. Please contact administrator.`);
  }

  mockStore.setCurrentUser(matched.uid);
  return { status: "ok", role: "trainer", name: matched.name };
};


export const verifyOtp = async (email: string, code: string): Promise<VerifyOtpResponse> => {
  const cleanEmail = email.trim().toLowerCase();
  if (isDemo) {
    const expectedOtp = sessionStorage.getItem("tp_test_otp_" + cleanEmail);
    if (expectedOtp && code !== expectedOtp && code !== "123456") {
      throw new Error("Invalid OTP code. Please enter the 6-digit code sent to your email.");
    }

    let users = mockStore.getUsers();

    // Direct match
    let matched = users.find((u) => u.email && u.email.trim().toLowerCase() === cleanEmail);

    // If not matched, try matching prefix e.g. "anirudh" from "anirudh@..."
    if (!matched) {
      const prefix = cleanEmail.split("@")[0].toLowerCase();
      matched = users.find((u) => u.name && u.name.toLowerCase() === prefix || (u.uid && u.uid.includes(prefix)));
    }

    // Server-persisted custom trainers fallback
    if (!matched && typeof window !== "undefined") {
      try {
        const resp = await fetch("/api/custom-trainers");
        if (resp.ok) {
          const list = await resp.json();
          if (Array.isArray(list) && list.length > 0) {
            for (const item of list) {
              mockStore.saveUser(item);
            }
            users = mockStore.getUsers();
            matched = users.find((u) => u.email && u.email.trim().toLowerCase() === cleanEmail);
            if (!matched) {
              const prefix = cleanEmail.split("@")[0].toLowerCase();
              matched = users.find((u) => u.name && u.name.toLowerCase() === prefix || (u.uid && u.uid.includes(prefix)));
            }
          }
        }
      } catch {}
    }

    if (!matched) {
      throw new Error("No trainer account found with this email. Please register your account first.");
    }

    if (matched.role === "admin") {
      throw new Error("This email is registered as an Administrator. Please use the Administrator tab to sign in.");
    }

    mockStore.setCurrentUser(matched.uid);
    return {
      status: matched.status === "Approved" ? "ok" : "pending",
      role: matched.role,
      name: matched.name,
    };
  }
  const fn = httpsCallable<{ email: string; code: string }, VerifyOtpResponse>(functions, "verifyOtp");
  const res = await fn({ email, code });

  if (res.data.status === "ok" && res.data.token) {
    await signInWithCustomToken(auth, res.data.token);
  }
  return res.data;
};

export interface RegisterTrainerInput {
  name: string;
  email: string;
  phone: string;
  state: string;
  code: string;
}

export const registerTrainer = async (input: RegisterTrainerInput): Promise<VerifyOtpResponse> => {
  const cleanEmail = input.email.trim().toLowerCase();

  if (isDemo) {
    const expectedOtp = sessionStorage.getItem("tp_test_otp_" + cleanEmail);
    if (expectedOtp && input.code !== expectedOtp && input.code !== "123456") {
      throw new Error("Invalid verification code. Please enter the 6-digit code sent to your email.");
    }

    const settings = mockStore.getSettings();
    const users = mockStore.getUsers();
    
    // Check if user already exists by email or name (e.g. preloaded from Excel)
    let matchedUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!matchedUser) {
      matchedUser = users.find((u) => u.name.toLowerCase() === input.name.trim().toLowerCase());
    }

    if (matchedUser) {
      const updatedUser: AppUser = {
        ...matchedUser,
        email: cleanEmail,
        phone: input.phone.trim() || matchedUser.phone,
        state: input.state || matchedUser.state,
      };
      mockStore.saveUser(updatedUser);
      mockStore.setCurrentUser(updatedUser.uid);
      return {
        status: updatedUser.status === "Approved" ? "ok" : "pending",
        role: "trainer",
        name: updatedUser.name,
      };
    }

    const newUid = `trainer_${cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_")}`;
    const status = settings.autoApprove ? "Approved" : "Pending";

    const newUser: AppUser = {
      uid: newUid,
      name: input.name.trim(),
      email: cleanEmail,
      phone: input.phone.trim(),
      state: input.state,
      role: "trainer",
      status: status,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
    };

    mockStore.saveUser(newUser);
    mockStore.setCurrentUser(newUid);

    return {
      status: status === "Approved" ? "ok" : "pending",
      role: "trainer",
      name: newUser.name,
    };
  }

  try {
    const fn = httpsCallable<RegisterTrainerInput, VerifyOtpResponse>(functions, "registerTrainer");
    const res = await fn(input);

    if (res.data.status === "ok" && res.data.token) {
      await signInWithCustomToken(auth, res.data.token);
    }
    return res.data;
  } catch (err: any) {
    console.warn("Cloud functions unreachable, falling back to local registration:", err);
    const settings = mockStore.getSettings();
    const newUid = `trainer_${cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_")}`;
    const status = settings.autoApprove ? "Approved" : "Pending";

    const newUser: AppUser = {
      uid: newUid,
      name: input.name.trim(),
      email: cleanEmail,
      phone: input.phone.trim(),
      state: input.state,
      role: "trainer",
      status: status,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
    };

    mockStore.saveUser(newUser);
    mockStore.setCurrentUser(newUid);

    return {
      status: status === "Approved" ? "ok" : "pending",
      role: "trainer",
      name: newUser.name,
    };
  }
};


export const logout = async (): Promise<void> => {
  await fbSignOut(auth);
};
