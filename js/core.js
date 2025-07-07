import {avtentificationButtons, checkAuth} from './avtentification.js';


export function innit() {
    console.log('Core initialized');
    avtentificationButtons(); //автентифікація
    checkAuth(); //відображення користувача
    
}