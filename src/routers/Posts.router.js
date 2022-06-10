import {Router} from 'express'
import * as postCrtl  from '../controllers/post.controller' 

const router = Router();

router.get('/',postCrtl.getPost);
router.get('/:offset',postCrtl.get5Post);
router.post('/createpost',postCrtl.createPost);
router.delete('/deletepost',postCrtl.deletePost);
export default router;