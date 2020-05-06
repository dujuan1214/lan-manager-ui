import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { FC } from "react";
import { Device } from '../../../test/devices';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white,
  },
}));
function createData(name, status, open) {
  return { name, status, open };
}
const rows = [createData("设备1", "开", "开"), createData("设备2", "开", "开")];
const List: FC<{ devices: Device[] }> = function (props) {
  const classes = useStyles();
  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell align="right">设备</TableCell>
          <TableCell align="right">状态</TableCell>
          <TableCell align="right">开关</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.status}</TableCell>
            <TableCell align="right">
              <Switch />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default List;
