/**
 * Class for all application dtos
 */

export interface DynamicValueType {
  message: string;
  backgroundColor: string;
  textColor: string;
}

export interface ExperimentConfigType {
  name: string;
  value: {
    sort_order: string;
  };
  ruleID: string;
  secondaryExposures: {
    gate: string;
    gateValue: string;
    ruleID: string;
  }[];
  allocatedExperimentName: string;
  evaluationDetails: {
    reason: string;
    time: number;
  };
  groupName: string;
  idType: string;
}

export interface TODOType {
  id: number;
  task: string;
  description: string;
  completed:boolean;
  edited:boolean;
  isEditing: boolean,
  serialNumber:number;
  lastViewed:boolean;
  createdDate:Date;
  modifiedDate:Date;
}
