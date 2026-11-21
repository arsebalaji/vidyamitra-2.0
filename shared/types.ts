export type Lang = 'te' | 'en';
export type Text = Record<Lang,string>;
export interface Lesson { id:string; title:Text; minutes:number; steps:{title:Text;body:Text;example:string}[]; summary:Text }
export interface Question { id:string; lessonId:string; level:number; prompt:Text; answer:string; hint:Text; explanation:Text }
export interface Pack {version:string; chapter:Text; lessons:Lesson[]; questions:Question[]}
export interface TutorRequest {message:string; lesson_id:string; language:Lang; mode:'simple'|'steps'|'example'|'hint'; online:boolean; consent:boolean}
export interface TutorResponse {answer:string; source:'offline'|'gemini'; lesson_id:string}
export interface CheckResponse {correct:boolean; answer:string; explanation:Text}
