package com.statsig.todo.util;

import com.statsig.sdk.StatsigUser;

public class Constants {

    public static final String TODO_EDITED = "SERVER_TODO_EDITED";
    public static final String TODO_CREATED = "SERVER_TODO_CREATED";
    public static final String TODO_DELETED = "SERVER_TODO_DELETED";

    public static final String TODO_FEATURE = "sample_feature_gate";
    public static final String TODO_CONFIG = "warning_banner";
    public static final String TODO_EXPERIMENT = "item_sorting";

    /**
     * Initialize the Statsig user
     * @return
     */
    public static StatsigUser getStatSigUser(){
        StatsigUser user = new StatsigUser("user_id");
        user.setCountry("IN");
        user.setUserID("user_java");
        user.setEmail("user_java@statsig.com");
        return user;
    }
}
