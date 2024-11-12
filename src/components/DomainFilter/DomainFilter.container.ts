import DomainFilter from "./DomainFilter.component";
import { connect } from "react-redux";
import { getDomains } from "../../redux/domains/selectors";
import { AppState } from "../../redux/store";

const mapStateToProps = (state: AppState) => ({
  domains: getDomains(state),
  pattern: "{country code}_{classification}-{sub classification}",
});

export default connect(mapStateToProps)(DomainFilter);
