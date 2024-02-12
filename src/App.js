import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import ViewAll from "./pages/view_all";
import Error404 from "./pages/error404";
import SingleModelView from "./pages/single_model_view";
import AdminCourseManagement from "./pages/admincoursemanagement";
import LoginPage from "./pages/login_page";
import AdminAddModel from "./pages/admin_add_model";
import AddObjectsModel from "./pages/add_objects_model";
import ViewAdmin from "./pages/view_admin";
import AdminAddadmin from "./pages/admin_add_admin";
import EditObjectsModel from "./pages/edit_objects_model";
import AdminEditModel from "./pages/admin_edit_model";
import ViewObjectsModel from "./pages/view_objects_model";
import UserLoginPage from "./pages/user_login";
import SuperLoginPage from "./pages/super_login_page";
import SuperAdminCourseManagement from "./pages/super_admin_management";
import SuperAdminReport from "./pages/report_page";
import SuperAdminAddModel from "./pages/super_admin_add_model";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="view-all" element={<ViewAll/>}/>
          <Route path="single-model-view" element= {<SingleModelView />} />
          {/* <Route path="user-login" element= {<UserLoginPage />} /> */}
          <Route path="user-login" element= {<UserLoginPage />} />
          {/* <Route path="---super-admin-login---" element= {<SuperLoginPage />} /> */}
          <Route path="admin-super-management" element= {<SuperAdminCourseManagement />} />
          <Route path="super-admin-add-model" element= {<SuperAdminAddModel />} />
          <Route path="admin-model-management" element= {<AdminCourseManagement />} />
          <Route path="admin-add-model" element= {<AdminAddModel />} />
          <Route path="add-model-objects/:dynamicParam" element= {<AddObjectsModel />} />
          <Route path="view-model-objects/:dynamicParam" element= {<ViewObjectsModel />} />
          <Route path="admin-super-report" element= {<SuperAdminReport />} />
          <Route path="view-admin" element= {<ViewAdmin />} />
          <Route path="add-admin" element= {<AdminAddadmin />} />
          <Route path="admin-edit-model" element= {<AdminEditModel />} />
          <Route path="edit-model-objects" element= {<EditObjectsModel />} />
          <Route path="*" element= {<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
