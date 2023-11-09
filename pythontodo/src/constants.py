from statsig.statsig_user import StatsigUser


TODO_EDITED = "SERVER_TODO_EDITED"
TODO_CREATED = "SERVER_TODO_CREATED"
TODO_DELETED = "SERVER_TODO_DELETED"
TODO_FEATURE = "sample_feature_gate"
TODO_CONFIG = "warning_banner"
TODO_EXPERIMENT = "item_sorting"
HOST = "127.0.0.1"
PORT = "8080"

user = StatsigUser(
    user_id="python_user",
    email="pythonuser@statsig.com",
    country="US",
    locale="en_US",
    app_version="4.3.0",
    custom={"cohort": "June 2021"},
    private_attributes={"gender": "female"},
)
