export interface user {
    id       : string
    username : string
    name     : string
    email    : string
}

export interface userCreate {
    username : string
    name     : string
    email    : string
    password : string 
}
