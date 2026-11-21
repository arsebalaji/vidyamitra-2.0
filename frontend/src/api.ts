import packJson from '../../shared/content.json';
import type {Pack,Lesson,Question,TutorRequest,TutorResponse,CheckResponse} from '../../shared/types';
import {equivalent,offlineReply} from './engine';
export const pack=packJson as Pack;
async function request<T>(path:string,options?:RequestInit):Promise<T>{const res=await fetch('/api/v1'+path,{...options,signal:AbortSignal.timeout(20000)});if(!res.ok){let msg='Request failed';try{msg=(await res.json()).detail??msg;}catch{}throw new Error(String(msg));}return res.json();}
export async function getLesson(id:string):Promise<Lesson>{try{return await request('/lessons/'+id);}catch{const l=pack.lessons.find(l=>l.id===id);if(!l)throw Error('Unknown lesson');return l;}}
export async function getQuestions(id:string):Promise<Question[]>{try{return await request('/lessons/'+id+'/questions');}catch{return pack.questions.filter(q=>q.lessonId===id);}}
export async function check(q:Question,answer:string):Promise<CheckResponse>{try{return await request('/quiz/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question_id:q.id,answer})});}catch{return {correct:equivalent(answer,q.answer),answer:q.answer,explanation:q.explanation};}}
export async function chat(req:TutorRequest):Promise<TutorResponse>{if(req.online)return request('/tutor/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(req)});try{return await request('/tutor/explain',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(req)});}catch{return offlineReply(pack.lessons.find(l=>l.id===req.lesson_id)!,req.language,req.mode);}}
export async function photo(file:File,lang:string,consent:boolean):Promise<TutorResponse>{const body=new FormData();body.append('file',file);body.append('language',lang);body.append('consent',String(consent));return request('/tutor/photo',{method:'POST',body});}
