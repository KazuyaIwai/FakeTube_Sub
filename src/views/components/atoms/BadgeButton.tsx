import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    borderRadius: '10px',
    backgroundColor: '#F2F2F2',
    color: 'gray',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
    padding: '5px 20px',
    whiteSpace: 'nowrap',
    flex: '0 0 auto',
    marginRight: theme.spacing(1),
    minWidth: 60,
  },
}));

type Props = {
  label: string;
  isSelected?: boolean;
  isArrow?: boolean;
  onClick: () => void;
};

const BadgeButton: React.FC<Props> = ({ label, isSelected, isArrow, onClick }: Props) => {
  const classes = useStyles({ label, isSelected, isArrow, onClick });
  var addStyle = {};
  if (isSelected) { addStyle = {backgroundColor: 'black', color: 'white'};}

  return (
    <Button className={classes.root} style={addStyle} onClick={isSelected ? ()=>{} : onClick}>
      {label}
    </Button>
  );
};

export default BadgeButton;
