import client from '@lib/client';

export const writeComment = ({postId, comment}) => {
    return client.post('/comment', {
        postId, comment
    });
}

export const getComments = ({postId}) => {
    return client.get('/comment', {
        params: {
            postId
        }
    });
}

export const deleteComment = ({id}) => {
    return client.delete('/comment', {
        params: {
            id
        }
    });
}