import React from 'react';
import signupHeroImage from '../../assets/images/signup-hero.png';

const SignUpHero = () => {
    return (
        <div className="w-1/2 bg-[#C1DBE3] p-12 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
                <img
                    src={signupHeroImage}
                    alt="Shopping cart with smartphone"
                    className="w-full h-full object-contain"
                />
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#D9D9D9] rounded-full opacity-30"></div>
                <div className="absolute -bottom-4 right-12 w-8 h-8 bg-[#D9D9D9] rounded-full opacity-30"></div>
                <div className="absolute top-1/4 -right-4 w-6 h-6 bg-[#D9D9D9] rounded-full opacity-30"></div>
            </div>
        </div>
    );
};

export default SignUpHero; 