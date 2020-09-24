import client from '@lib/client';

export const writePost = ({title, contents}) => {
    return client.post('/post', {
        title, contents
    });
}

export const getPost = ({id, author}) => {
    return client.get('/post', {
        params: {
            id, author
        }
    });
}
export const getPosts = ({author}) => {
    return client.get('/posts', {
        params: {
            author
        }
    });
}