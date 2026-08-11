import { EditorialBoard } from '../../models/editorial-board.model';
import { User } from '../../models/user.model';
import { NotFoundError } from '../../shared/errors';
import { Types } from 'mongoose';

export class EditorialService {
  async getBoardMembers() {
    return EditorialBoard.find()
      .populate('userId', 'fullName email')
      .sort({ sortOrder: 1 });
  }

  async addOrUpdateMember(data: { userId: string; designation: string; bio: string; researchInterests?: string[]; qualifications?: string[]; photoUrl?: string; sortOrder?: number }) {
    const user = await User.findById(data.userId);
    if (!user) throw new NotFoundError('User not found');

    const updateFields = {
      designation: data.designation,
      bio: data.bio,
      researchInterests: data.researchInterests || [],
      qualifications: data.qualifications || [],
      photoUrl: data.photoUrl,
      sortOrder: data.sortOrder || 0,
    };

    return EditorialBoard.findOneAndUpdate(
      { userId: new Types.ObjectId(data.userId) },
      { $set: updateFields },
      { upsert: true, new: true }
    );
  }

  async removeMember(userId: string) {
    const member = await EditorialBoard.findOneAndDelete({ userId: new Types.ObjectId(userId) });
    if (!member) throw new NotFoundError('Member not found');
    return true;
  }
}

export const editorialService = new EditorialService();
