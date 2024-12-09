import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Workname is required'], // Workspace name is mandatory
      unique: true
    },
    description: {
      type: String,
      trim: true // Optional description of the workspace
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '', // References the User who owns the workspace
      required: true
    },
    members: [
      {
        menberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User' // List of users who are part of the workspace
        },

        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        }
      }
    ],
    joinCode: {
      type: String,
      required: [true, 'join code is required']
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chennal'
      }
    ]
  },
  { timestamps: true }
);

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
