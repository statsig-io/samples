import { Statsig } from "statsig-react";
import { useStatsigLogEffect } from "statsig-react";


// Statsig.logEvent("log_sample_event", "123", {
//     name: "Demo application",
//     action: "Demo Action",
// });

// or via a React Hook


export function LogEvent() {
  useStatsigLogEffect("log_sample_event", "123", {
    name: "Demo application",
    action: "Demo Action",
  });

  return <div>...</div>;
}