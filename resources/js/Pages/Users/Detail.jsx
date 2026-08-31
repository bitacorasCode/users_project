import { Head, Link } from "@inertiajs/react";
import { Badge, Button, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

import UserGeneralTab from "../../Components/Users/Tabs/UserGeneralTab";
import UserAddressTab from "../../Components/Users/Tabs/UserAddressTab";
import UserNotesTab from "../../Components/Users/Tabs/UserNotesTab";

export default function Detail({ user, general, address, notes }) {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <>
            <Head title={`${user.name} ${user.last_name}`} />

            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h1 className="mb-2">
                            {user.name} {user.last_name}
                        </h1>

                        <div className="d-flex align-items-center gap-2 text-muted">
                            <span>{user.email}</span>

                            <span>•</span>

                            <span>{user.role}</span>

                            <Badge
                                bg={
                                    user.state === "Activo"
                                        ? "success"
                                        : "secondary"
                                }
                            >
                                {user.state}
                            </Badge>
                        </div>
                    </div>

                    <Button as={Link} href="/users" variant="outline-secondary">
                        Volver al listado
                    </Button>
                </div>

                <div className="card">
                    <div className="card-body">
                        <Tabs activeKey={activeTab} onSelect={setActiveTab}>
                            <Tab eventKey="general" title="Información general">
                                <UserGeneralTab
                                    active={activeTab === "general"}
                                    data={general}
                                />
                            </Tab>

                            <Tab eventKey="address" title="Dirección">
                                <UserAddressTab
                                    active={activeTab === "address"}
                                    data={address}
                                />
                            </Tab>

                            <Tab eventKey="notes" title="Notas">
                                <UserNotesTab
                                    active={activeTab === "notes"}
                                    data={notes}
                                />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
