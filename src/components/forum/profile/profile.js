import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Profile extends Component {

    componentWillMount() {
        this.props.setBreadcrumbs({});
        //always get user data
        this.props.getUserData(this.props.params.id, true);
    }

    componentWillUnmount() {
        this.props.clearUserData();
    }

    renderAvatar = (avatar) => {
        if(avatar.length >= 4 && avatar.substring(avatar.length - 4) === 'gifv') {
            return (
                <video preload="auto" autoPlay="autoplay" muted loop="loop" width={200} height={200}>
                    <source src={`https://${avatar.substring(0, avatar.length - 5)}.mp4`} type="video/mp4"/>
                </video>
            );
        }

        return <img crossOrigin="Anonymous" src={`https://${avatar}`} alt="avatar" width={150} height={150}/>
    };

    render() {
        if(this.props.userData != null && this.props.userData.id == this.props.params.id) {
            return (
                <div className="border">
                    <div className="profile-wrapper">
                        <div className="profile-side">

                            <div className="profile-username">
                                {this.props.userData.username}
                            </div>
                            <div className="profile-avatar">
                                {this.renderAvatar(this.props.userData.avatar)}
                            </div>
                            <div className="profile-posts">
                                Posts: {this.props.userData.post_count}
                            </div>

                        </div>

                        <div className="profile-info-side">
                            <div style={{ height: '20px'}}></div>
                            <div className="profile-bio-wrapper">
                                <div className="profile-bio-title">Bio</div>
                                <div className="profile-bio-content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia eros ipsum, vitae blandit ipsum vestibulum sed. Integer vel diam varius, aliquam mi ut, auctor orci. Integer gravida dolor sit amet sapien ullamcorper pulvinar. Maecenas ultrices fringilla lacinia. Phasellus placerat sollicitudin purus a sodales. Sed nec ante tincidunt, gravida ex sed, porttitor turpis. Curabitur neque magna, iaculis vitae nunc ac, semper sagittis leo. Aenean ac placerat eros, ut blandit mauris. Vestibulum in enim vestibulum, congue metus et, dignissim lectus. Donec quis consequat mi. Sed id imperdiet massa, nec lacinia magna. Suspendisse potenti. Aenean gravida, dolor at luctus viverra, massa nisi laoreet diam, in bibendum felis risus vehicula nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras molestie, nisl ac pellentesque iaculis, justo eros lobortis sem, porta elementum neque leo sit amet justo. In ac ultrices ante, nec ornare libero. Cras posuere, neque a sollicitudin hendrerit, sapien arcu commodo metus, nec laoreet arcu dolor vitae ex. Donec efficitur turpis ac placerat sodales. Suspendisse sed ex at arcu consectetur cursus a eget felis.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return <div>Loading...</div>
    }

}

function mapStateToProps(state) {
    return {
        user: state.auth,
        userData: state.forum.user
    };
}

export default connect(mapStateToProps, actions)(Profile);