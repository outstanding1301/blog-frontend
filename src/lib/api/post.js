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

export const deletePost = ({id}) => {
    return client.delete('/post', {
        params: {
            id
        }
    });
}

export const getPosts = ({author, limit, isNew, id}) => {
    return client.get('/posts', {
        params: {
            author, limit, isNew, id
        }
    });
}