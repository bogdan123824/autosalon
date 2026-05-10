import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCarContext } from "../context/carContext";

export default function CharacteristicsCar() {
    const { car, getCar} = useCarContext();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        if (id) {
            getCar(id);
        }
    }, [id]);    

    return (
    <>
        <div className="auto--right">
                <h2>Характеристики</h2>
                <div className="auto--table">
                    <table cellSpacing="1">
                        <tbody>
                            {car?.additional_info && car.additional_info.length > 0 ? (
                                car?.additional_info?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr key={index} className="first-row-table">
                                            <th className="red-text-table" style={{width: '80%'}} colSpan={2}>{item.title}</th>
                                        </tr>
                                        <>{item.characteristics.map((characteristic, index) => (
                                                <tr key={index}>
                                                    <td className="title-table">{characteristic.name}</td>
                                                    <td>{characteristic.value}</td>
                                                </tr>
                                        ))}</>
                                    </React.Fragment>
                                    ))
                            ) : (
                                <tr>
                                    <td className="title-table" colSpan={2} style={{textAlign: 'center'}} >Нема характеристик</td>
                                </tr>
                            )}
                        </tbody>
                    </table> 
                </div>
        </div>
    </>
    )
}