import client from '@lib/client';

export const likePost = ({postId}) => {
    return client.post('/like', {
        postId
    });
}

export const getLikes = ({postId}) => {
    return client.get('/like', {
        params: {
            postId
        }
    });
}