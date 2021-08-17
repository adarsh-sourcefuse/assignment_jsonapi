import {Router} from 'express'
const userControllers=require('../controllers/user')
const router=Router()


router.get('/',userControllers.getUsers)
router.post('/user',userControllers.addUser)
router.put('/user/:userId',userControllers.updateUser)
router.delete('/user/:userId',userControllers.deleteUser)
export default router
