import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./containers/Gallery";
import Upload from "./containers/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Upload />} />
        <Route path="/gallery" index element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
