import AllPost from "../components/AllPost";
import Friends from "../components/Friends";
import Layout from "../components/Layout";
import Profile from "../components/Profile";



export const HomeAuth = () => {
   
    return (
       <>
        <Layout>
             <div className=" gap-2 justify-between flex ">
              <Profile/>
            
             <AllPost/>
              <Friends/>



              </div>
        </Layout>
          
 
            
         </>
    );
};

export default HomeAuth;
