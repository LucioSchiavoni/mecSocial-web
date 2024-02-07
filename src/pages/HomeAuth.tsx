import AllPost from "../components/AllPost";
import Friends from "../components/Friends";
import Layout from "../components/Layout";

import ProfileSm from "../components/ProfileSm";



export const HomeAuth = () => {
   
    return (
       <>
        <Layout>
             <div className=" gap-2 justify-between flex ">
              <ProfileSm/>
            
             <AllPost/>
              <Friends/>



              </div>
        </Layout>
          
 
            
         </>
    );
};

export default HomeAuth;
