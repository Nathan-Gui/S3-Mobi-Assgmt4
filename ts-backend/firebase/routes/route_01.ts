export {}

import express from 'express';
import { FirestoreAdd, FirestoreDel, FirestoreUpd, FirestoreQry } from '../core/FirestoreOPs'


interface resProp { 
  status: (arg0: number) => { 
    json: { (arg0: { status:number ,msg?: string, entries?: { id?: string, first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, }[] }): any, },
  },
}

export const router = express.Router();

// ✅ POST /api/fs/ee/a - add ee info
router.post('/a', async (req: { body: { first: string, last: string, dept: string, sup: string, eeid: string, eml: string, tel: string, },}, res: resProp) => {
  // const { first, last, dept, sup, eeid, eml, tel } = req.body; console.log('--> add ee: ', first, last, dept, sup, eeid, eml, tel);
  
  if (await FirestoreAdd(req.body)){
    return res.status(201).json({ status: 201, msg: 'Info added!' });
  }else{
    return res.status(500).json({ status: 500, msg: 'Error occourred!' });
  }
});

// ✅ POST /api/fs/ee/d - del ee info
router.post('/d', async (req: { body: { id: string },}, res: resProp) => {
  const { id } = req.body;
  console.log('--> del ee: ', id);
  console.log('--> del ee: ', req.body);
  console.log('--> del ee: ', req.body.id);
  if (id && await FirestoreDel(id)){
    return res.status(201).json({ status: 201, msg: 'Info deleted!' });
  }else{
    return res.status(500).json({ status: 500, msg: 'Error occourred!' });
  }
});

// ✅ POST /api/fs/ee/u - update ee info
router.post('/u', async (req: { body: { id: string, first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, },}, res: resProp) => {
  const { id } = req.body; // console.log('--> upd ee: ', id);

  if (await FirestoreUpd(id, req.body)){
    return res.status(201).json({ status: 201, msg: 'Info updated!' });
  }else{
    return res.status(500).json({ status: 500, msg: 'Error occourred!' });
  }
});

// ✅ GET /api/users/logout - query ee info
router.get('/q', async (req: any, res:resProp) => {
  const rst = await FirestoreQry();
  if (rst == null){
    console.log('--> qry ee: size 0');
    return res.status(500).json({ status: 500, msg: 'Error occourred!' });
  } else {
    console.log('--> qry ee: size', rst.length);
    return res.status(200).json({ status: 200, entries: rst });
  }
});

// module.exports = router;
// const userRoutes = require('./routes/route_01');

// export const router = express.Router();
// import { router } from './routes/route_01'
