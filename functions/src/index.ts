/**
 * TrainerPlan Cloud Functions entry point.
 * Region: asia-south1 · Runtime: Node 22 · Firebase Functions v2
 */
export { requestOtp, verifyOtp, registerTrainer, adminDirectLogin } from "./auth";
export { uploadPhoto, deletePhoto } from "./drive/photos";

export { submitVisit } from "./visits";
export { reminderTick, missedJob } from "./scheduler";
export { adminCreateUser, adminUpdateUser, adminDeleteUser, adminRunJob } from "./admin";
