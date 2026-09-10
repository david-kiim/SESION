import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react';
import dictionary from './translations.json';
export type Language = 'ko' | 'en' | 'zh-CN';
const messages: Record<string, string[]> = dictionary;
export function translate(text:string,language:Language):string {
 if(language==='ko')return text;
 const key=text.trim();const translated=messages[key]?.[language==='en'?0:1];
 return translated===undefined?text:text.slice(0,text.indexOf(key))+translated+text.slice(text.indexOf(key)+key.length);
}
// Translate presentation nodes only. State keys, reward records, handlers and form values
// remain stable, so switching language never changes eligibility or claim identity.
export function localize(node:ReactNode,language:Language):ReactNode {
 if(typeof node==='string')return translate(node,language);
 if(Array.isArray(node))return Children.map(node,child=>localize(child,language));
 if(!isValidElement(node))return node;
 const element=node as ReactElement<Record<string,unknown>>;
 const props:Record<string,unknown>={};
 for(const name of ['aria-label','alt','title','placeholder'])if(typeof element.props[name]==='string')props[name]=translate(element.props[name] as string,language);
 if(element.props.children!==undefined)props.children=localize(element.props.children as ReactNode,language);
 return cloneElement(element,props);
}
