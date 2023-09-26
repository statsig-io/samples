import { v4 as uuidv4 } from "uuid";
import { UUID } from "../../node_modules/statsig-js/dist/StatsigIdentity";

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
  id: UUID;
  serialNumber: number;
  task: string;
  completed: boolean;
  isEditing: boolean;
  createdDate: Date;
  modifiedDate: Date;
  lastViewed: boolean;
}
