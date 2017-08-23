export class User {
    username: string;
    password: string;
    first_name: string;
    email: string;
    last_name: string;
}

export class PostUser{
    username: string;
    email: string;
    is_active: boolean;
}

export class Post{
    id: string;
    user: PostUser;
    title: string;
    slug: string;
    content: string;
    html: string;
    publish: string;
    comments: string;
}
