# Changelog

## 2017-11-01

### Fixed

- Various copy added to the translation system
- Fixed bug where image was not shown after posting an idea
- Loading behaviour of the information pages
- Fixed bug where the app no longer worked after visiting some projects
### Added
- Added groups to the admin
- Added permissions to projects
- Social sharing of ideas on twitter and (if configured for the platform) facebook
- Projects can be linked to certain areas in the admin
- Projects can be filtered by area on the projects page
- Backend events are logged to segment

### Changed
- Improved the styling of the filters 
- Project description in the admin has its own tab
- Restored the landing page header with an image and configurable text 
- Improved responsiveness for idea show page
- Maximum allowed password length has increased to 72 characters
- Newest projects are list first

## 2017-10-09

### Fixed
- The male/female gender selection is no longer reversed after registration
- On firefox, the initial loading animation is properly scaled
- After signing in, the state of the vote buttons on idea cards is now correct for the current user
- Fixed bug were some text would disappear, because it was not available in the current language
- Fixed bug where adding an idea failed because of a wrongly stored user language
- Fixed bug where removing a language in the admin settings fails
- Graphical glitches on the project pages

### Added
- End-to-end test coverage for the happy flow of most of the citizen-facing app interaction
- Automated browser error logging to be proactive on bugs
- An idea can be removed through the admin

### Changed
- The modal that shows an idea is now fullscreen and has a new animation
- New design for the idea show page
- New design for the comments, with animation and better error handling
- The "Trending" sorting algorithm has changed to be more balanced and give new ideas a better chance
- Slightly improved design of the page that shows the user profile

## 2017-09-22

### Fixed
- Bug where multiple form inputs didn't accept typed input
- Issues blocking the login process
- The success message when commenting no longer blocks you from adding another comment
- Clicking an internal link from the idea modal didn't work
- Responsiveness of filters on the ideas page
- Updating an idea status through the admin failed

### Added
- Initial loading animation on page load
- Initial version of the legal pages (T&C, privacy policy, cookie policy)
- All forms give more detailed error information when something goes wrong
- Full caching and significant speed improvements for all data resources

### Changed
- Refactoring and restyling of the landing page, idea cards and project cards
- Added separate sign in and sign up components
- Cleaned up old and unused code
- The navbar is no longer shown when opening a modal
- Lots of little tweaks to styling, UX and responsiveness


## 2017-09-01

### Fixed
- Saving forms in the admin of Projects will now show success or error messages appropriately
- The link to the guide has been hidden from the admin sidebar until we have a guide to link to

### Added
- Adding an idea from a project page will pre-fill parts of the new idea form
- The landing page now prompts user to add an Idea if there are none
- The landing page will hide the Projects block if there are none

### Changed
- Under-the-hood optimizations to increase the loading speed of the platform

## 2017-08-27

### Fixed
- Changing the logo and background image in admin settings works
- Platform works for users with an unsupported OS language

### Added
- Admin dashboard
- Default topics and idea statuses for newly deployed platforms
- Proper UX for handling voting without being signed in
- Meta tags for SEO and social sharing
- Better error handling in project admin

### Changed
- Projects and user profile pages now use slugs in the URL

## 2017-08-18

### Fixed
- Changing idea status in admin
- Signing up
- Proper rending of menu bar within a project
- Admin settings are properly rendered within the tab container
- Lots of small tweaks to rendering on mobile
- Default sort ideas on trending on the ideas index page

### Added
- Admin section in projects to CRUD phases
- Admin section in projects to CRUD events
- New navbar on mobile
- Responsive version of idea show page

### Changed
- Navbar design updated
- One single login flow experience instead of 2 separate ones (posting idea/direct)
- Admins can only specify light/dark for menu color, not the exact color

### Removed
- Facebook login (Yet to be added to new login flow, will be back soon)

## 2017-08-13

### Fixed

* Voting on cards and in an idea page
* Idea modal loading speed
* Unread notification counter

### Added

* New improved flow for posting an idea
* Admin interface for projects
* New design for idea and project cards
* Consistenly applied modal, with new design, for ideas
* Segment.io integration, though not all events are tracked yet

### Changed

* Idea URls now using slugs for SEO
