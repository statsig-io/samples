package com.statsig.todo.util;

import com.statsig.sdk.DynamicConfig;
import com.statsig.sdk.Statsig;

import java.util.HashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class Util {

    public static void initializeStatsig() throws ExecutionException, InterruptedException{
        Future initFuture = Statsig.initializeAsync("secret-F4JPRCLoZVaYNwzQRE1FmqcC124QRuw7ZyxjdAEx7Hv");
        initFuture.get();
    }

    public static boolean getFeature(){
        Future<Boolean> featureOn = Statsig.checkGateAsync(Constants.getStatSigUser(), Constants.TODO_FEATURE);
        Boolean isFeatureOn = false;
        try {
            isFeatureOn = featureOn.get();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
        System.out.println("Is delete feature on: "+isFeatureOn);
        return isFeatureOn;
    }

    public static HashMap getDynamicConfig() throws ExecutionException, InterruptedException {

        Future<DynamicConfig> configFuture = Statsig.getConfigAsync(Constants.getStatSigUser(), Constants.TODO_CONFIG);
        DynamicConfig config = configFuture.get();
        System.out.println("Dynamic config is: "+config.getValue());
        return (HashMap) config.getValue();
    }

    public static HashMap getExperiment() throws ExecutionException, InterruptedException {
        DynamicConfig experiment = Statsig.getExperimentAsync(Constants.getStatSigUser(), Constants.TODO_EXPERIMENT).get();
        System.out.println("Experiment is: "+experiment.getValue());
        return (HashMap) experiment.getValue();
    }

    public static void logEvent(String tag, String message){
        Statsig.logEvent(Constants.getStatSigUser(), tag, message);
    }

}
