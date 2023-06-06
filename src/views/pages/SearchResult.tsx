import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OmitSidebar from '../components/organisms/OmitSidebar';
import SearchResultContent from '../components/organisms/SearchResultContent';


const useStyles = makeStyles((theme: Theme) => ({
  contents: {
    marginLeft: 96,
    paddingTop: 96,
  },
}));

const SearchResult: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <OmitSidebar />
      <div className={classes.contents}>
        <SearchResultContent />
      </div>
    </>
  );
}

export default SearchResult;