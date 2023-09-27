import React, { useRef, useState,useEffect } from "react";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import instanceAxios from "../api/api";
import { NavLink } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

import { BiSolidUserDetail } from "react-icons/bi";

import { TabView, TabPanel } from 'primereact/tabview';

function User() {
  const dt = useRef(null);
  const [data,setData] = useState([])
  const detailsInfo = (rowData) => {
    const styleBtn = {
      textDecoration: "none",
      cursor: "pointer",
      fontSize: "1em",
      color: "black",
    };

    return (
      <NavLink to={`/utilisateurs/${rowData.id}`} style={styleBtn}>
        <BiSolidUserDetail fontSize="1.5em" />
      </NavLink>
    );
  };
  useEffect(()=>{
    const getParticipant = async ()=>{
      const response = await instanceAxios.get("get-user")
      setData(response.data.data);
    }
    getParticipant()
  },[])

  const footer = `${data ? data.length : 0} participants.`;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    prenoms: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.IN },
    phone: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    const conteneurSearch = {
      padding: "1.3em",
    };
    const exportExcel = () => {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer = xlsx.write(workbook, {
              bookType: 'xlsx',
              type: 'array'
          });

          saveAsExcelFile(excelBuffer, 'students-files');
      });
  };

  const saveAsExcelFile = (buffer, fileName) => {
      import('file-saver').then((module) => {
        
              let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
              let EXCEL_EXTENSION = '.xlsx';
              const data = new Blob([buffer], {
                  type: EXCEL_TYPE
              });

              module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        
      });
  };
    return (
      <div className="conteneur-search">
       
      <div className="btn-upload-file">
      <Button type="button" 
      label="Excel format"
      icon="pi pi-file-excel"
      style={
        {
          border:"none",
          color:"white",
          margin:"1em 0",
        }
      }
      onClick={exportExcel} 
      data-pr-tooltip="XLS" />
      </div>

        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          style={conteneurSearch}
        />
      </div>
    );
  };
  const header = renderHeader();
  

  return (
    <div className="conteneur-page">
       <h1>Participants</h1>
      { data.length > 0 ? ( <TabView>
       <TabPanel header="Participants">
      <DataTable
        ref={dt}
        value={data}
        footer={footer}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
        filters={filters}
        globalFilterFields={["nom", "prenoms", "email", "phone"]}
        header={header}
      >
        <Column field="nom" header="Nom"></Column>
        <Column field="prenoms" header="Prénoms"></Column>
        <Column field="email" header="email"></Column>
        <Column field="phone" header="Téléphone"></Column>
        <Column field="id" header="detail" body={detailsInfo}></Column>
      </DataTable>
      </TabPanel>
      
      </TabView>):(
        <h1 style={
          {textAlign:"center"}
        }>Loading......</h1>
      )

      }
    </div>
  );
}

export default User;
