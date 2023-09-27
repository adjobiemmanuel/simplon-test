import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";

import { IoChevronBackCircleOutline } from "react-icons/io5";
import instanceAxios from "../api/api";


function DetailUser() {
    const navigate = useNavigate()
  const { id } = useParams();
  const [detailUser, setDetailUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instanceAxios.get("get-user");

        const detailUser = response.data.data.find((item) => item.id === Number(id));
  
        setDetailUser(detailUser);
        console.log(detailUser);
      } catch (error) {
        console.error("Une erreur s'est produite : ", error);
      }
    };
    getData();
  }, [id]);
  return (
    <div className="detail-student">
      <div className="back-user">
        <span
          className="back-home"
          onClick={() => {
            navigate("/utilisateurs");
          }}
        >
          <IoChevronBackCircleOutline />
        </span>
        <h1>Détail Participant</h1>
      </div>
      <div className="conteneur-info-student">

        {
          detailUser != null ? (  <section>
            <h1>Info Personnelle</h1>
            <div>
              <strong>Nom : </strong>
              <span>{detailUser.nom}</span>
            </div>
            <div>
              <strong>Prénoms : </strong>
              <span>{detailUser.prenoms}</span>
            </div>
            <div>
              <strong>Email :</strong>
              <span>{detailUser.email}</span>
            </div>
            <div>
              <strong>Téléphone : </strong>
              <span>{detailUser.phone}</span>
            </div>
          </section>):(
            <h5>
              loading...
            </h5>
          )
        }
        
      </div>
    </div>
  );
}

export default DetailUser;
