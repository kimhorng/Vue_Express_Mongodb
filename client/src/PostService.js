import axios from 'axios';

const url = '/api/tasklist';

class PostService {
      // Get Posts
      // static getPosts(){
      //       return new Promise(async (resolve, reject) => {
      //             try{
      //                   const res =  axios.get(url);
      //                   const data = res.data;
      //                   resolve(
      //                         data.map(mytask => ({
      //                               ...mytask,
      //                               createAt: new Date(mytask.createAt)
      //                         }))
      //                   );
      //             }catch(err){
      //                  return reject(err);
      //             }
      //       });
      // }
      // static getPosts() {
      //       return new Promise((resolve, reject) => {
      //         axios
      //           .get(url)
      //           .then((res) => {
      //             const data = res.data;
      //             resolve(
      //               data.map((mytasks) => ({
      //                 ...mytasks,
      //                 createAt: new Date(mytasks.createAt),
      //               }))
      //             );
      //           })
      //           .catch((err) => {
      //             reject(err);
      //           });
      //       });
      //     }

      // //Get Posts
      static async getPosts() {
      const response = await fetch(url);
      const data = await response.json();

            return data.map(mytask => ({
                  ...mytask,
                  createAt: new Date(mytask.createAt)
            }));
      }
      
      // Create Post
      static insertPost(task){
            return axios.post(url, {
                  task
            });
      }

      // Delete Post
      static deletePost(id){
            return axios.delete(`${url}/${id}`);
      }
}
export default PostService;