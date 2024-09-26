import express, { Router } from 'express';
import {addBeeper, getAlBeepers, getBeeperById, updateBeeper, deleteBeeper, getBeepersByStatus} from '../controllers/beeperController.js' 


const router: Router = express.Router();

router.route('/api/beepers').post(addBeeper);
router.route('/api/beepers').get(getAlBeepers);
router.route('/api/beepers/:id').get(getBeeperById);
router.route('/api/beepers/:id/status').put(updateBeeper);
router.route('/api/beepers/:id').delete(deleteBeeper);
router.route('/api/beepers/status/:status').get(getBeepersByStatus);


export default router;