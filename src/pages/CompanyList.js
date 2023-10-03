import {
    useQuery,
} from 'react-query'
import { getCompanies } from '../apis/company.api';
import { Link } from 'react-router-dom';
import Table from "../components/Table/Table";
import Navbar from "../components/Navbar";
const CompanyList = () => {
    const { data, error, isError } = useQuery('companies', getCompanies);
    let user = JSON.parse(localStorage.getItem('user'));
    const prop_columns = [
        {
            Header: 'Company Logo',
            accessor: 'logo',
            Cell: (tableProps) => (
                tableProps.row.original.logo ?
                    <img src={'https://data-share-8a9408323960.herokuapp.com/' + tableProps.row.original.logo} alt="company logo" />
                    : 'NIL'
            )
        },
        {
            Header: 'Company Name',
            accessor: 'name',
        },
        {
            Header: 'Tracking Number',
            accessor: 'numberOfUsers',
        },
        {
            Header: 'Tracking Number',
            accessor: 'numberOfProducts',
        },
        {
            Header: 'Tracking Number',
            accessor: 'Percentage',
        },
        {
            Header: 'Upload Logo',
            accessor: '',
            Cell: (tableProps) => (
                <Link to={`/editCompany/${tableProps.row.original.id}`} className="btn btn-primary">Edit</Link>
            )
        },
    ]


    return (
        <div className="container">
            <Navbar username={user} />
            <div className="content">
                <div className="companies">
                    <Table prop_columns={prop_columns} custom_data={data ? data : []} />
                </div>
            </div>
        </div>
    );
}

export default CompanyList;