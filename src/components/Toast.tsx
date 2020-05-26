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

interface ToastProps {
  severity: any;
  text: string;
}

interface ToastFn {
  show: () => void;
  // error: () => void;
  // success: () => void;
  // clone: () => void;
}

let messageInstance: Notification = null;
export const Toast: FC<ToastProps> & ToastFn = function ({ severity, text }) {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity}>{text || ""}</Alert>
    </Snackbar>
  );
};

Toast.show = function () {};

export const ToastUtil = {
  show(param: Props) {
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
  },

  error(text = "", onClose = () => {}) {
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
  },

  success(text = "", onClose = () => {}) {
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
        content: notification ? (
          <Toast text={text} severity={"success"} />
        ) : null,
      });
    });
  },
  clone() {
    messageInstance.destroy();
  },
};

export default Toast;
