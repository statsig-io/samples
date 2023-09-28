import * as React from "react";
import { DynamicValueType } from "../AppDtos/DTOS";


const DEFAULT_TEXT_COLOR = "#ffffff";
const DEFAULT_BACKGROUND_COLOR = "#3b86d5";



/**
 * Component to display warning banner based on given dynamic configuration value
 * @param {*} param0
 * @returns
 */
export const WarningBanner = ({ dynamicValue } :{dynamicValue:DynamicValueType}) => {
  return (
    <div
      style={{
        padding: "1rem",
        marginTop: ".5rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `${
          dynamicValue.backgroundColor || DEFAULT_BACKGROUND_COLOR
        }`,
      }}
    >
      <p
        style={{
          fontSize: "1rem",
          color: `${dynamicValue.textColor || DEFAULT_TEXT_COLOR}`,
        }}
      >
        {dynamicValue.message}
      </p>
    </div>
  );
};
