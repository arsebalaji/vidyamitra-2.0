import Dexie,{type Table} from 'dexie';
import type {Lesson} from '../../shared/types';
import type {Attempt} from './engine';
export interface Profile {id:string;name:string;color:string;created:number}
export interface Completion {key:string;profileId:string;lessonId:string;step:number;done:boolean}
class LearningDB extends Dexie {
  profiles!:Table<Profile,string>; attempts!:Table<Attempt,number>; completions!:Table<Completion,string>; downloads!:Table<{id:string;lesson:Lesson;savedAt:number},string>;
  constructor(){super('vidyamitra-v1');this.version(1).stores({profiles:'id',attempts:'++id,profileId,lessonId',completions:'key,profileId',downloads:'id'});}
}
export const db=new LearningDB();
export async function initialize(){if(await db.profiles.count()===0)await db.profiles.put({id:'demo-mitra',name:'మిత్ర',color:'#5B5FEF',created:Date.now()});}
