import mongoose from "mongoose";

interface SharedAccess {
  ownerId: string;
  sharedWithId: string;
  accessLevel: string; // e.g., 'read', 'edit'
}

const sharedAccessSchema = new mongoose.Schema<SharedAccess>({
  ownerId: { type: String, required: true },
  sharedWithId: { type: String, required: true },
  accessLevel: { type: String, required: true },
});

export default mongoose.model<SharedAccess>("SharedAccess", sharedAccessSchema);