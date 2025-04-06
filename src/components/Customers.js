import React from 'react';

const Customers = () => {
    return (
        <section className="customers">
            <div className="customers-banner">
                <h3 className="main-heading">Testimony</h3>
                <h1>Customers Say</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
                    doloribus qui nemo earum perspiciatis fugiat quae a numquam
                    quibusdam asperiores.
                </p>
            </div>
            <div className="clients">
                <div className="client">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Veritatis eos, maiores commodi sint voluptatum atque iusto itaque.
                        Voluptates, asperiores delectus!
                    </p>
                    <div>
                        <img src="/images/client1.jpg" alt="Client" />
                        <span>John Smith</span>
                    </div>
                </div>
                <div className="client">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil et,
                        quam repudiandae facere nulla nobis rerum quasi commodi ratione,
                        ducimus sapiente debitis illum similique eveniet numquam provident
                        tempore sed architecto!
                    </p>
                    <div>
                        <img src="/images/client2.jpg" alt="Client" />
                        <span>Nick Brown</span>
                    </div>
                </div>
                <div className="client">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
                        illo! Architecto autem voluptatibus eum iste neque dolores vitae.
                        Animi, eius?
                    </p>
                    <div>
                        <img src="/images/client3.jpg" alt="Client" />
                        <span>David Jones</span>
                    </div>
                </div>
                <div className="client">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero,
                        recusandae.
                    </p>
                    <div>
                        <img src="/images/client4.jpg" alt="Client" />
                        <span>Ann Smith</span>
                    </div>
                </div>
                <div className="client">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore,
                        illo! Architecto autem voluptatibus eum iste neque dolores vitae.
                        Animi, eius?
                    </p>
                    <div>
                        <img src="/images/client5.jpg" alt="Client" />
                        <span>Mary Brown</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customers; 