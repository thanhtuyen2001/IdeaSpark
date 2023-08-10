import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
   creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
   },
   prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
   },
   tag: {
    type: String,
   },
   photo: {
      type: String,
      required: [true, 'Photo is required.'],
     }
})
const Post = models.Post || model('Post', PostSchema);
export default Post;
