import React from "react";
import { Link } from "react-router-dom";
const CollectionList = (props) => {
    return (
        <div id="PageContainer">
                <section id="collection-wrapper">
                    <div className="container">
                        <div className="row">
                            {
                                props.collections.map(collection => 
                                    <div key={collection.id} className="col-lg-6">
                                        <div className="collection-item-tacgia">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <Link to={`${collection.id}`}><img src="./img/book_shell.png"/></Link>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="c-author-listing--details">
                                                        <div className="c-author-listing--title">
                                                            <span className="word2 lastname">
                                                                {collection.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>    
                                )
                            }
                        </div>
                    </div>
                </section>
        </div>

React-Bootstrap is compatible with various versions of Bootstrap. As such, you need to ensure you are using the correct combination of versions.

See the below table on which version of React-Bootstrap you should be using in your project.

Bootstrap Version	React-Bootstrap Version	Documentation
v5.x	2.x	Link
v4.x	1.x	Link
v3.x	0.33.x (not maintained)	Link
Migrating from previous versions
Bootstrap 4 to Bootstrap 5
If you would like to update React-Bootstrap within an existing project to use Bootstrap 5, please read our docs for migrating to React-Bootstrap V2.

Bootstrap 3 to Bootstrap 4
If you would like to update React-Bootstrap within an existing project to use Bootstrap 4, please read our docs for migrating to React-Bootstrap V1.

Related modules
react-router-bootstrap – Integration with React Router
Awesome React Bootstrap Components - Additional components like off-canvas navbar, switch and sliders.
Local setup
Yarn is our package manager of choice here. Check out setup instructions here if you don't have it installed already. After that you can run yarn run bootstrap to install all the needed dependencies.

From there you can:

Run the tests once with yarn test (Or run them in watch mode with yarn run tdd).
Start a local copy of the docs site with yarn start
Or build a local copy of the library with yarn run build
CodeSandbox Examples
Click here to explore some React-Bootstrap CodeSandbox examples.

Click here to automatically open CodeSandbox with the React-Bootstrap CodeSandbox Examples GitHub Repository as a workspace.

Contributions
Yes please! See the contributing guidelines for details.

Readme
Keywords
bootstrapreactcomponentcomponentsecosystem-reactreact-component
Package Sidebar
Install
npm i react-bootstrap

Repository
github.com/react-bootstrap/react-bootstrap

Homepage
react-bootstrap.github.io/

Weekly Downloads
2,154,546

Version
2.9.0

License
MIT

Unpacked Size
1.53 MB

Total Files
771

Issues
120

Pull Requests
37

Last publish
14 hours ago

Collaborators
monastic.panic
taion
kytsang
Try on RunKit
Report malware
Footer
Support
Help
Advisories
Status
Contact npm
Company
About
Blog
Press
    )
}

export default CollectionList