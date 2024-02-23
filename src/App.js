import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/1_super_admin/login_screen";
import SuperAdminManagement from "./pages/1_super_admin/super_admin_management";
import AdminManagement from "./pages/2_tagger/tagger_management";
import SuperUsersManagement from "./pages/1_super_admin/super_users_management";
import SuperUsersAdd from "./pages/1_super_admin/super_users_add";
import SuperModelsManagement from "./pages/1_super_admin/super_models_management";
import SuperModelsAdd from "./pages/1_super_admin/super_models_add";
import AddObjectsModel from "./pages/add_objects_model";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index  element={<LoginScreen/>}/>
          <Route path="admin-super-management" element= {<SuperAdminManagement />} />

          <Route path="admin-model-management" element= {<SuperModelsManagement />} />
          <Route path="admin-model-add" element= {<SuperModelsAdd />} />

          <Route path="admin-user-management" element= {<SuperUsersManagement />} />
          <Route path="admin-user-add" element= {<SuperUsersAdd />} />

          <Route path="add-objects-model/:dynamicParam" element= {<AddObjectsModel />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
