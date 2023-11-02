from statsig import statsig
from statsig.statsig_event import StatsigEvent

import constants

def initializeSdk():
        statsig.initialize("secret-ymVyAizDsdVeukPHFrKgWnPK2eDiZniBUGDYn2RtJfb")
     
def isDeleteFeatureEnable():     
       isDeleteEnable:bool = statsig.check_gate(constants.user,constants.TODO_FEATURE )
       print(isDeleteEnable);
       return isDeleteEnable

def getConfig():
       config = statsig.get_config(constants.user, constants.TODO_CONFIG)
       config_json = config.get_value()
       print(config_json)
       
def logEvent(eventName):   
       statsig.log_event(StatsigEvent(constants.user, eventName))