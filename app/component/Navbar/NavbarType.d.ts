export type NavbarState = {
    search: string;
    openNavbar: boolean;
    openLogin: boolean;
    openRegister: boolean;
    lang:string;
}

export type ResponseGoogle = {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    hd: string;
    email: string;
    email_verified: boolean;
    nbf: number;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
    jti: string;
}

export type ResponseRequestGoogle = {
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    sub: string;
}