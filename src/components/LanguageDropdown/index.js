// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import enFlag from './flags/us.jpg';
import germanyFlag from './flags/germany.jpg';
import italyFlag from './flags/italy.jpg';
import spainFlag from './flags/spain.jpg';
import russiaFlag from './flags/russia.jpg';

const Languages = [
    {
        name: 'English',
        flag: enFlag,
    },
    {
        name: 'German',
        flag: germanyFlag,
    },
    {
        name: 'Italian',
        flag: italyFlag,
    },
    {
        name: 'Spanish',
        flag: spainFlag,
    },
    {
        name: 'Russian',
        flag: russiaFlag,
    },
];

type LanguageDropdownProps = {};

type LanguageDropdownState = {
    dropdownOpen?: boolean,
};

class LanguageDropdown extends Component<LanguageDropdownProps, LanguageDropdownState> {
    constructor(props: LanguageDropdownProps) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.state = {
            dropdownOpen: false,
        };
    }

    /*:: toggleDropdown: () => void */
    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    render() {
        const enLang = Languages[0] || {};

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="button"
                    className="nav-link dropdown-toggle arrow-none btn btn-link"
                    onClick={this.toggleDropdown}
                    aria-expanded={this.state.dropdownOpen}>
                    <img src={enLang.flag} alt={enLang.name} className="mr-1" height="12" />{' '}
                    <span className="align-middle">{enLang.name}</span>
                    <i className="mdi mdi-chevron-down align-middle"></i>
                </DropdownToggle>
                <DropdownMenu right className="dropdown-menu-animated topbar-dropdown-menu">
                    <div onClick={this.toggleDropdown}>
                        {Languages.map((lang, i) => {
                            return (
                                <Link to="/" className="dropdown-item notify-item" key={i + '-lang'}>
                                    <img src={lang.flag} alt={lang.name} className="mr-1" height="12" />{' '}
                                    <span className="align-middle">{lang.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default LanguageDropdown;
