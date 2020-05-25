import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import React, { FC } from "react";
import Notification from "rmc-notification";
interface Props {
  severity: string;
  text: string;
  duration?: number;
  onClose: () => void;
}

interface ToastFn {
  show: any;
  error: () => void;
  success: () => void;
  clone: () => void;
}

let messageInstance: Notification = null;
export const Toast: FC<{ severity: any; text: string }> = function ({
  severity,
  text,
}) {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity}>{text || ""}</Alert>
    </Snackbar>
  );
};

Toast.show = function (param: Props) {
  Notification.newInstance({}, (notification) => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = notification;
    notification.notice({
      duration: param.duration || 2,
      closable: true,
      onClose: () => param.onClose?.(),
      content: notification ? <Toast {...param} /> : null,
    });
  });
};

Toast.error = function (text = "", onClose = () => {}) {
  Notification.newInstance({}, (notification) => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = notification;
    notification.notice({
      duration: 2,
      closable: true,
      onClose,
      content: notification ? <Toast text={text} severity={"error"} /> : null,
    });
  });
};

Toast.success = function (text = "", onClose = () => {}) {
  Notification.newInstance({}, (notification) => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = notification;
    notification.notice({
      duration: 2,
      closable: true,
      onClose,
      content: notification ? <Toast text={text} severity={"success"} /> : null,
    });
  });
};

Toast.clone = function () {
  messageInstance.destroy();
};
export default Toast;
